class PlaylistsController < ApplicationController

    before_action :authorize

    def index 
        playlists = user.playlists
        render json: playlists
    end

    def create
        playlist = user.playlists.create(playlist_params)
        render json: playlist
    end

    def update
        if user
            playlist = user.playlists.find_by(id: playlist_params[:id])
            if playlist
                playlist.update(playlist_params)
                render json: playlist
            else
                render json: { error: "Playlist not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def destroy
        if user
            playlist = user.playlists.find_by(id: playlist_params[:id])
            if playlist
                playlist.destroy
                head :no_content
            else
                render json: { error: "Playlist not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end


    private

    def user
        User.find_by(id: session[:user_id])
    end

    def playlist_params
        params.permit(:id, :name)
    end

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end

end
