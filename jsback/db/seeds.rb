# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

provider1 = Provider.create(name: 'Dr. Apple', hospital: 'Berry Clinic')
provider2 = Provider.create(name: 'Dr. Plum', hospital: 'Maple State')
provider3 = Provider.create(name: 'Dr. Pi', hospital: 'Juice Center')
provider4 = Provider.create(name: 'Dr. Cherry', hospital: 'Honey Lane')
provider5 = Provider.create(name: 'Dr. Lemon', hospital: 'Blueberry Med')

user1 = User.create(name: 'CC')


appointment1 = Appointment.create(date: '20200101', note: 'Bring juice', provider: provider1, user: user1)
appointment2 = Appointment.create(date: '20200202', note: 'Eat banana', provider: provider2, user: user1)
appointment3 = Appointment.create(date: '20200303', note: 'Jump on strawberries', provider: provider3, user: user1)
appointment4 = Appointment.create(date: '20200404', note: 'Plant watermelons', provider: provider4, user: user1)
appointment5 = Appointment.create(date: '20200505', note: 'Water oranges', provider: provider5, user: user1)

puts 'seeds done'