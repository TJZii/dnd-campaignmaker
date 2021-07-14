class PlaylistsController < ApplicationController

    before_action :authorize

    def index 
        user = User.find_by(id: session[:user_id])
        playlists = user.playlists
        render json: playlists
    end

    def create
        user = User.find_by(id: session[:user_id])
        playlist = user.playlists.create(playlist_params)
        render json: playlist
    end


    private

    def playlist_params
        params.permit(:name)
    end

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end

end
