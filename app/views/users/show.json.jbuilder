# frozen_string_literal: true

json.extract! @user, :name, :email
json.id @user.id.to_s
json.email_confirmed @user.email_confirmed?
