class UsersController < ApplicationController
    
    before_action :set_current_user

    def show
    end

    def data
        send_data @user.generate_data_dump, filename: "#{@user.name}.csv", type: "application/csv"
    end

    private

    def set_current_user
        @user = current_user
    end
end