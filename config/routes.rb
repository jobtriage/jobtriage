Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # Routes for auth
  defaults format: :json do
    post 'auth/register',      to: 'auth#register'
    post 'auth/login',         to: 'auth#login'
    post 'auth/logout',        to: 'auth#logout'
    get  'auth/logout',        to: 'auth#logout'
    get  'auth/test',          to: 'auth#test'
    get  'auth/verify/:token', to: 'auth#verify_email'
    get  'auth/resend',        to: 'auth#resend_email'
    post 'auth/change',        to: 'auth#change_password'
    post 'auth/generateotp',   to: 'auth#generate_otp'
    post 'auth/verifyotp',     to: 'auth#verify_otp'
    delete 'auth/deleteuser',     to: 'auth#delete_user'
    # Routes for auth ends

    resources :applications do
      resources :notes
      resources :timelogs
    end

    resources :analyses
    resource :pitch

    match '*all', to: 'static#index', via: [:get]
  end
end
