class AppointmentSerializer

  
  # include FastJsonapi::ObjectSerializer
  attributes :date, :note, :provider_id, :user_id, :user, :provider 

#   def initialize(appointment_object)
#     @appointment = appointment_object 
#   end 

#   def to_serialized_json 
#     @appointment.to_json(:except => [:updated_at, :created_at])
#   end 
end