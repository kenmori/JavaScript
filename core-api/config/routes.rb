# frozen_string_literal: true

Rails.application.routes.draw do
  # For rails monitor
  mount HealthMonitor::Engine, at: "/"

  # For devise
  devise_for :users, controllers: {
    sessions: "users/sessions",
    confirmations: "users/confirmations",
    passwords: "users/passwords"
  }
  devise_scope :user do
    put "users/confirmation", to: "users/confirmations#update"
  end

  root to: "home#index", as: :root

  resources :objectives, only: %i[index show create update destroy] do
    member do
      post "copy", to: "objectives#create_copy"
      put "disable", to: "objectives#update_disabled"
      get "histories", to: "objectives#history"
    end
    collection do
      get "candidates", to: "objectives#index_candidates"
    end
  end

  resources :key_results, only: %i[index create update destroy] do
    member do
      get "objective", to: "key_results#show_objective"
      put "process", to: "key_results#update_processed"
      put "disable", to: "key_results#update_disabled"
      get "histories", to: "key_results#history"
    end
    collection do
      get "candidates", to: "key_results#index_candidates"
      get "unprocessed", to: "key_results#index_unprocessed"
      get "comment_labels", to: "key_results#comment_labels"
    end
  end

  resources :users, only: %i[show create update] do
    member do
      put "disable", to: "users#update_disabled"
      put "password", to: "users#update_password"
      put "resend"
      put :user_setting, to: "users#update_user_setting"
      put :objective_order, to: "users#update_objective_order"
    end
    collection do
      get "sign_up(/*path)" => "home#non_login"
      get "password(/*path)" => "home#non_login"
    end
  end

  resources :organizations, only: %i[show create update] do
    member do
      put "owner", to: "organizations#update_owner"
    end
  end

  resources :okr_periods, only: %i[index create update destroy] do
    member do
      get "export", to: "okr_periods#export_okrs", defaults: { format: "csv" }
    end
  end

  resources :departments, only: %i[index create update destroy] do
    member do
      patch :restore
    end
  end
end
