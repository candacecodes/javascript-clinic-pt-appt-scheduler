class AppointmentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :date, :note, :provider_id, :user_id
end