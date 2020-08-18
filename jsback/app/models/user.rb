class User < ApplicationRecord
    has_many :appointments
    has_many :providers, through: :appointments
end