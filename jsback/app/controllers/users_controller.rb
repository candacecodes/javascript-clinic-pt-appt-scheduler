class UsersController < ApplicationController
    def index 
        @users = User.all 
        render json: @users
    end 

    def show 
        @user = User.find_by_id(params[:id]) 
        render json: @user
    end 

    def new 
        user = User.new
    end 

    def create 
        user = User.new(name: params["name"])
        user.save 
        render json: @user 
    end 
end

#test 