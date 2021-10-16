Rails.application.routes.draw do
  devise_for :users
  resources :twats
  resources :likes, only: [:index, :new, :create, :destroy]
  resources :follows, only: [:index ,:new, :create, :destroy]
  root 'pages#index'
  get '/login', to: 'pages#index'
  get '/signUp', to: 'pages#index'
  get '/user/:id', to: 'pages#index'
  
  namespace :api do 
    get '/current_user' => 'user#get_current_user'
    get '/get_posts' => 'twats#get_all_twats'
    post '/already_following' => 'follows#already_following?'
    delete '/unfollow' => 'follows#unfollow'
    post '/get_user_profile' => 'user#get_user_profile'
    post '/twat_exists' => 'twats#twat_exists'
  end
end
