# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

provider1 = Provider.create(name: 'Dr. Seuss', hospital: 'Mayo Clinic')
provider2 = Provider.create(name: 'Dr. Hippocrates', hospital: 'UCSF')
provider3 = Provider.create(name: 'Dr. Pi', hospital: 'Johns Hopkins')
provider4 = Provider.create(name: 'Dr. Jenner', hospital: 'Cleveland Clinic')
provider5 = Provider.create(name: 'Dr. Fleming', hospital: 'UCLA Medical Center')

user1 = User.create(name: 'user1')


appointment1 = Appointment.create(date: '20200101', note: 'note1', provider: provider1, user: user1)
appointment2 = Appointment.create(date: '20200202', note: 'note2', provider: provider2, user: user1)
appointment3 = Appointment.create(date: '20200303', note: 'note3', provider: provider3, user: user1)
appointment4 = Appointment.create(date: '20200404', note: 'note4', provider: provider4, user: user1)
appointment5 = Appointment.create(date: '20200505', note: 'note5', provider: provider5, user: user1)

puts 'seeds done'