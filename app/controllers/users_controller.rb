class UsersController < ApplicationController
    
    before_action :set_current_user

    def show
    end

    def data
        send_data @user.generate_data_dump, filename: "#{@user.name}.pdf", type: "application/pdf"
    end

    private

    def set_current_user
        @user = current_user
    end
end