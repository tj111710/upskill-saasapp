Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  #__PAGES CONTROLELR
  root to: 'pages#home'
  get 'about', to: 'pages#about'
  
  #___CONTACTS CONTROLLER
  resources :contacts
  get 'contact-us', to: 'contacts#new'
end
