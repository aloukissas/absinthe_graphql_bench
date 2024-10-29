defmodule AbsintheTestWeb.Schema.Book do
  use Absinthe.Schema.Notation

  object :book do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :num_pages, non_null(:integer)
  end
end
