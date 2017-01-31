class ContactsController < ApplicationController
    
    # GET request to /contact-us
    # Show new contact form
    def new
      @contact = Contact.new
    end
      
    # POST request /contacts
    def create
      # Mass assignment of form fields into Contact object
      @contact = Contact.new(contact_params)
        #Save Contact obj to database
        if @contact.save
          #MAILER
          name = params[:contact][:name]
          email = params[:contact][:email]
          body = params[:contact][:comments]
          ContactMailer.contact_email(name, email, body).deliver
          
          #REDIRECT SUCCESS
          flash[:success] = "Message sent"
          redirect_to new_contact_path
          
        else
          #REDIRECT WITH ERRORS
          flash[:danger] = @contact.errors.full_messages.join(", ")
          redirect_to new_contact_path
        end
      
    end
    
    private
    # To collect data from form, use strong parameters
    # And whitelist the form fields
      def contact_params
        params.require(:contact).permit(:name, :email, :comments)
      end

end
