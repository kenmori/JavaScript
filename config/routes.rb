Rails.application.routes.draw do
  root to: 'home#index', as: :root
  resources :objectives, only: %i[index create update destroy]
  resources :key_results, only: %i[index create update destroy]
  get '*path', to: 'home#index'
end
