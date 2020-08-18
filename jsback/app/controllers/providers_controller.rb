class ProvidersController < ApplicationController

        def index 
            @providers = Provider.all 
            render json: @providers
        end 
    
        def show 
            @provider = Provider.find_by_id(params[:id]) 
            render json: @provider
        end 
    
        def new 
            provider = Provider.new
        end 
    
        def create 
            provider = Provider.new(name: params["name", "hospital"])
            provider.save 
            render json: @provider 
        end 
    end 

