Rails.application.routes.draw do

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  get "/longestSong", to: "songs#longestSong"

  resources :playlists do
    resources :songs
  end

  resources :songs

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
