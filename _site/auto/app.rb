require 'rubygems'
require 'sinatra'
require 'pony'
require_relative 'app_config'

set :public_folder, Proc.new { File.join(root, "_site") }

# This before filter ensures that your pages are only ever served
# once (per deploy) by Sinatra, and then by Varnish after that
before do
  response.headers['Cache-Control'] = 'public, max-age=31557600' # 1 year
end

get '/' do
  File.read('_site/index.html')
end

post '/send-project-info' do
  Pony.mail :to => 'fer@ferdev.com',
    :from => params[:email],
    :subject => "[FERDEV] New project request!",
    :html_body => erb(:'email'),
    :via => :smtp,
    :via_options => {
      :address              => 'smtp.gmail.com',
      :port                 => '587',
      :user_name            => APP_CONFIG['email_address'],
      :password             => APP_CONFIG['email_password'],
      :authentication       => APP_CONFIG['email_auth'].to_sym,
      :domain               => APP_CONFIG['email_domain'],
      :enable_starttls_auto => true
    }

    erb(:'email-sent')
end
