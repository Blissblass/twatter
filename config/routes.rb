Rails.application.routes.draw do
  resources :twats
  resources :likes, only: [:index, :new, :create, :destroy]
  resources :follows, only: [:index ,:new, :create, :destroy]
  root 'pages#index'
  get '/login', to: 'pages#index'
  get '/signUp', to: 'pages#index'
  get '/user/:id', to: 'pages#index'
  get '/user/:id/followers', to: 'pages#index'
  get '/user/:id/follows', to: 'pages#index'
  
  namespace :api do 
    get '/current_user' => 'user#get_current_user'
    get '/get_posts' => 'twats#get_all_twats'
    post '/already_following' => 'follows#already_following?'
    delete '/unfollow' => 'follows#unfollow'
    post '/get_user_profile' => 'user#get_user_profile'
    post '/twat_exists' => 'twats#twat_exists'
    get '/get_home_feed' => 'twats#home_twats'
    post '/search_user' => 'user#search_for_user'
    patch '/change_user_image' => 'user#change_user_image'
    patch '/update_user' => 'user#update_user'
    post '/user_follows' => 'user#get_user_follows'
    post '/user_followers' => 'user#get_user_followers'
  end

  Rails.application.routes.draw do
    devise_for :users, controllers: {
      sessions: 'users/sessions'
    }
  end

end
