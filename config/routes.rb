Rails.application.routes.draw do
  # For rails monitor
  mount HealthMonitor::Engine, at: '/'

  # For devise
  devise_for :users, controllers: {
    :sessions => 'users/sessions',
    :confirmations => 'users/confirmations',
    :passwords => 'users/passwords'
  }
  devise_scope :user do
    put "users/confirmation", to: "users/confirmations#update"
  end

  root to: 'home#index', as: :root
  resources :objectives, only: %i[index show create update destroy] do
    member do
      post 'copy', to: 'objectives#create_copy'
    end
    collection do
      get 'candidates', to: 'objectives#index_candidates'
    end
  end
  resources :key_results, only: %i[index create update destroy] do
    member do
      get 'objective', to: 'key_results#show_objective'
      put 'process', to: 'key_results#update_processed'
    end
    collection do
      get 'candidates', to: 'key_results#index_candidates'
      get 'unprocessed', to: 'key_results#index_unprocessed'
    end
  end
  resources :users, only: %i[create update destroy] do
    member do
      put 'restore', to: 'users#restore'
      put 'password', to: 'users#update_password'
      put 'current_organization_id', to: 'users#update_current_organization_id'
      put 'resend', to: 'users#resend'
      put :user_setting, to: 'users#update_user_setting'
      put :objective_order, to: 'users#update_objective_order'
    end
    collection do
      get 'sign_up(/*path)' => 'home#non_login'
      get 'password(/*path)' => 'home#non_login'
    end
  end
  resources :organizations, only: %i[show create update]
  resources :okr_periods, only: %i[index create update destroy]
  get '*path', to: 'home#index'
end
