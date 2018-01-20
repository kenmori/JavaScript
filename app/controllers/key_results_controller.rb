class KeyResultsController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    forbidden and return unless valid_permission?(@user.organization.id)

    @key_results = @user.key_results
                     .includes(:child_objectives)
                     .where(okr_period_id: params[:okr_period_id])
                     .order(created_at: :desc)
  end

  def create
    @user = User.find(params[:key_result][:owner_id])
    forbidden and return unless valid_permission?(Objective.find(params[:key_result][:objective_id]).owner.organization.id)
    forbidden and return unless valid_permission?(@user.organization.id)

    ActiveRecord::Base.transaction do
      @key_result = @user.key_results.create!(key_result_create_params)
      params[:key_result][:key_result_members].each do |id|
        # FIXME: 任意のユーザIDで作成してしまうが、サーバ側で採番しない？
        @key_result.key_result_members.create!(user_id: id, role: :member)
      end
    end
    render status: :created
  rescue
    unprocessable_entity_with_errors(@key_result.errors)
  end

  def update
    @key_result = KeyResult.find(params[:id])
    forbidden and return unless valid_permission?(@key_result.owner.organization.id)

    ActiveRecord::Base.transaction do
      @key_result.update!(key_result_update_params)
      update_key_result_members if params[:key_result][:key_result_member]
      update_comment if params[:key_result][:comment]
    end
    render action: :create, status: :ok
  rescue
    unprocessable_entity_with_errors(@key_result.errors)
  end

  def destroy
    @key_result = KeyResult.find(params[:id])
    forbidden and return unless valid_permission?(@key_result.owner.organization.id)

    if @key_result.destroy
      render action: :create, status: :ok
    else
      unprocessable_entity_with_errors(@key_result.errors)
    end
  end

  private

  def update_key_result_members
    key_result_member_data = params[:key_result][:key_result_member]
    user_id = key_result_member_data['user']
    behavior = key_result_member_data['behavior']
    role = key_result_member_data['role'] == 'owner' ? :owner : :member

    if behavior == 'add'
      if role == :owner
        # 責任者の変更 (前の owner を削除する)
        owner = @key_result.key_result_members.find_by(role: :owner)
        owner.destroy!
      end
      member = @key_result.key_result_members.find_by(user_id: user_id)
      if member.nil?
        # FIXME: 任意のユーザIDで作成してしまうが、サーバ側で採番しない？
        @key_result.key_result_members.create!(user_id: user_id, role: role)
      else
        # 関係者から責任者に変更
        member.update!(role: role)
      end
    elsif behavior == 'remove'
      # FIXME: 任意のユーザIDで作成してしまうが、サーバ側で採番しない？
      member = @key_result.key_result_members.find_by(user_id: user_id)
      member.destroy!
    end
  end

  def update_comment
    comment_data = params[:key_result][:comment]
    if comment_data['behavior'] == 'add'
      @key_result.comments.create!(text: comment_data['data'], user_id: current_user.id)
    elsif comment_data['behavior'] == 'edit'
      data = comment_data['data']
      comment = @key_result.comments.find(data['id'])
      comment.update!(text: data[:text])
    elsif comment_data['behavior'] == 'remove'
      comment = @key_result.comments.find(comment_data['data'])
      comment.destroy!
    end
  end

  def key_result_create_params
    params.require(:key_result)
      .permit(:name, :objective_id, :target_value, :value_unit, :expired_date)
  end

  def key_result_update_params
    params.require(:key_result)
      .permit(:name, :progress_rate, :target_value, :actual_value, :value_unit, :expired_date)
  end
end
