Rails.application.routes.draw do
  # For rails monitor
  mount HealthMonitor::Engine, at: '/'

  # For devise
  devise_for :users, skip: :registrations, controllers: {
    :confirmations => 'users/confirmations',
    :passwords => 'users/passwords'
  }
  devise_scope :user do
    patch "users/confirmation", to: "users/confirmations#confirm"
  end

  root to: 'home#index', as: :root
  get 'users/sign_up(/*path)' => 'home#non_login'
  get 'users/password(/*path)' => 'home#non_login'
  resources :objectives, only: %i[index create update destroy]
  resources :key_results, only: %i[index create update destroy]
  resources :users, only: %i[index show create update destroy] do
    put 'password', to: 'users#update_password'
    put 'current_organization_id', to: 'users#update_current_organization_id'
  end
  resources :organizations, only: %i[show update]
  resources :okr_periods, only: %i[index create update destroy]
  get '*path', to: 'home#index'
end
