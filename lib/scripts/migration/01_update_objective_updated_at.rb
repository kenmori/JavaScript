class UpdateObjectiveUpdatedAt
  def self.execute
    # Objective の更新日を、紐付く KR やコメントも含めた最新の更新日にする (touch 導入時のマイグレーション)
    Objective.all.each do |objective|
      objective.key_results.each do |key_result|
        # KR の更新日を、KR 自身とコメントの中で最新の更新日にする
        key_result.update_column(:updated_at, key_result.comments.map(&:updated_at).push(key_result.updated_at).max)
      end
      # Objective の更新日を、Objective 自身と KR の中で最新の更新日にする
      objective.update_column(:updated_at, objective.key_results.map(&:updated_at).push(objective.updated_at).max)
    end
  end
end

UpdateObjectiveUpdatedAt.execute
