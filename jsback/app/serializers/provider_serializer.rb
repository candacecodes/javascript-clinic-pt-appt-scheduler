class ProviderSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :hospital
end
