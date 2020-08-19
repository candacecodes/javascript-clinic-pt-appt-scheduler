class AppointmentsController < ApplicationController

    # require_relative '../services/appointment_serializer.rb'

    def index 
        @appointments = Appointment.all 
        render json: @appointments 
    end 

    def show 
        @appointment = Appointment.find_by_id(params[:id]) 
        render json: @appointment 
    end 

    def create 
        byebug 
        appointment = Appointment.new(date: params["date"], note: params["note"], provider_id: params["provider_id"], user_id: params["user_id"])
        appointment.save 
        render json: appointment #sends appt to front end 

    end 

end

# note to self: @ is to to view variable in front end  

