class Users::RegistrationsController < Devise::RegistrationsController
  
  # Extend devise default behavior so that pro users save with credit/subscription for Stripe
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          # Otherwise devise signs up user normally
          resource.save
        end
      end
    end
  end
  
end