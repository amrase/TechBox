Rails.application.routes.draw do
  # resources :likes
  
  resources :tags
  resources :follows
  resources :news
  resources :categories
  # resources :blogs

  resources :blogs  do

    resources :likes
  end

  resources :comments

  # resources :users, only: [:show, :create]
  resources :users do 
    resources :blogs
 
  end

  post '/login', to: 'users#login'
  get '/persist', to: 'users#persist'

  # get 'user_blogs/:user_id' => 'blogs#user', as: :user_blogs

end
