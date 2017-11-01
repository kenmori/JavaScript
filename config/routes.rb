Rails.application.routes.draw do
  devise_for :users, :controllers => {
    :registrations => 'users/registrations'
  }

  devise_scope :user do
    get 'users/sign_up' => 'users/registrations#sign_up'
  end

  root to: 'home#index', as: :root
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
