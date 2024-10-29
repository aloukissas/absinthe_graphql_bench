defmodule AbsintheTestWeb.Schema.Author do
  use Absinthe.Schema.Notation

  alias AbsintheTestWeb.Resolvers

  object :author do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :company, non_null(:string)

    field :books, non_null(list_of(non_null(:book)))
  end

  object :author_queries do
    field :authors, non_null(list_of(non_null(:author))) do
      resolve &Resolvers.Author.all/3
    end
  end
end
