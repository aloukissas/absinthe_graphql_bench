defmodule AbsintheTestWeb.Schema do
  use Absinthe.Schema

  import_types AbsintheTestWeb.Schema.Author
  import_types AbsintheTestWeb.Schema.Book

  query do
    import_fields :author_queries
  end
end
