defmodule AbsintheTest.Repo do
  use Ecto.Repo,
    otp_app: :absinthe_test,
    adapter: Ecto.Adapters.Postgres
end
