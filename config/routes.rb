Rails.application.routes.draw do
  devise_for :users, skip: :registrations

  root to: 'home#index', as: :root
  get 'users/sign_up(/*path)' => 'home#non_login'
  get 'users/password(/*path)' => 'home#non_login'
  resources :objectives, only: %i[index create update destroy]
  resources :key_results, only: %i[index create update destroy] do
    resources :plans, only: %i[index create update destroy]
  end
  resources :users, only: %i[index show create update destroy] do
    put 'password', to: 'users#update_password'
  end
  resources :organizations do
    resource :okr_settings, only: %i[show create update]
  end
  get '*path', to: 'home#index'
end
