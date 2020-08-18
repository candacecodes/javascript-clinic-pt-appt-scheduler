class AppointmentsController < ApplicationController
    def index 
        @appointments = Appointment.all 
        render json: @appointments 
    end 

    def show 
        @appointment = Appointment.find_by_id(params[:id]) 
        render json: @appointment 
    end 

    def create 
        appointment = Appointment.new(name: params["date", "note", "provider_id", "user_id"])
        appointment.save 
        render json: @appointment 
    end 
end
