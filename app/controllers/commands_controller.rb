class CommandsController < ApplicationController\

    def index 
        user = User.find_by(session[:user_id])
        if user
            commands = user.commands
        else
        end
    end

end
