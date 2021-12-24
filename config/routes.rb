Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html  resources :twats
  resources :likes, only: [:index, :new, :create, :destroy]
  resources :follows, only: [:index, :new, :create, :destroy]
  resources :comments, only: [:index, :new, :create, :update, :edit, :destroy]
  root 'pages#index'
  get '/login', to: 'pages#index'
  get '/signUp', to: 'pages#index'
  get '/user/:id', to: 'pages#index'
  get '/user/:id/followers', to: 'pages#index'
  get '/user/:id/follows', to: 'pages#index'
  get '/post/:id', to: 'pages#index'
  
  namespace :api do 
    get '/current_user' => 'user#get_current_user'
    get '/get_posts' => 'twats#get_all_twats'
    post '/already_following' => 'follows#already_following?'
    delete '/unfollow' => 'follows#unfollow'
    post '/get_user_profile' => 'user#get_user_profile'
    post '/twat_exists' => 'twats#twat_exists'
    get '/get_home_feed/:id' => 'twats#home_twats'
    post '/search_user' => 'user#search_for_user'
    patch '/change_user_image/:id' => 'user#change_user_image'
    patch '/update_user/:id' => 'user#update_user'
    post '/user_follows' => 'user#get_user_follows'
    post '/user_followers' => 'user#get_user_followers'
    post '/follow_recommendations' => 'user#get_follow_recommendations'
    get '/get_twat/:id' => 'twats#get_twat'
    get '/get_comments/:id' => 'twats#get_twat_comments'
    get '/twat_stats/:id' => 'twats#get_twat_stats'
  end
end
