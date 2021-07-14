class SongsController < ApplicationController

    before_action :authorize

    def index
        user = User.find_by(id: session[:user_id])
        if user
            playlist = Playlist.find_by(id: song_params[:playlist_id])
            if playlist
                render json: playlist.songs
            else
                render json: { error: "Playlist not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user
            playlist = Playlist.find_by(id: song_params[:playlist_id])
            if playlist
                song = playlist.songs.create(song_params)
                render json: song
            else
                render json: { error: "Playlist not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            playlist = Playlist.find_by(id: song_params[:playlist_id])
            if playlist
                song = Song.find_by(id: song_params[:id])
                if song
                    song.update(song_params)
                    render json: song
                else
                    render json: { error: "Song not found" }, status: :not_found
                end
            else
                render json: { error: "Playlist not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            playlist = Playlist.find_by(id: song_params[:playlist_id])
            if playlist
                song = Song.find_by(id: song_params[:id])
                if song
                    song.destroy
                    head :no_content
                else
                    render json: { error: "Song not found" }, status: :not_found
                end
            else
                render json: { error: "Playlist not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    private

    def authorize
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end

    def song_params
        params.permit(:id, :name, :url, :playlist_id, :artist, :song)
    end

end
