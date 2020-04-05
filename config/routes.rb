Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Routes for auth
  post 'auth/register',      to: 'auth#register'
  post 'auth/login',         to: 'auth#login'
  post 'auth/logout',        to: 'auth#logout'
  get  'auth/logout',        to: 'auth#logout'
  get  'auth/test',          to: 'auth#test'
  get  'auth/verify/:token', to: 'auth#verify_email'
  get  'auth/resend',        to: 'auth#resend_email'

  # Routes for auth ends

  resources :applications do
    resources :notes
  end
end
