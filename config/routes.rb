Rails.application.routes.draw do
  devise_for :users, skip: :registrations

  root to: 'home#index', as: :root
  resources :objectives, only: %i[index create update destroy]
  resources :key_results, only: %i[index create update destroy] do
    resources :plans, only: %i[index create update destroy]
  end
  resources :users, only: %i[index show create update destroy]
  resources :okr_settings, only: %i[show create update]
  get '*path', to: 'home#index'
end
