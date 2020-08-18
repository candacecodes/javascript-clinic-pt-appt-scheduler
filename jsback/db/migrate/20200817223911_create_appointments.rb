class CreateAppointments < ActiveRecord::Migration[6.0]
  def change
    create_table :appointments do |t|
      t.datetime :date
      t.string :note
      t.integer :provider_id
      t.integer :user_id

      t.timestamps
    end
  end
end
