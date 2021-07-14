class SessionsController < ApplicationController
    def create  #Login
      user = User.find_by(name: params[:name])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user, status: :created
        else 
          render json: { error: "Invalid name or password" }, status: :unauthorized
        end
    end

    def destroy  #Logout
        session.delete :user_id
        head :no_content
    end
end
