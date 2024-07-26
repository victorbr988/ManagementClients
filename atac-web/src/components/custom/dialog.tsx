import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Client } from "@/interfaces/client"
import { createClient } from "@/requests/createClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function ModalCreateClient() {
  const [client, setClient] = useState<Pick<Client, 'name' | 'latitude' | 'longitude' | 'email' | 'phone'>>({
    name: '',
    email: '',
    phone: '',
    latitude: 0,
    longitude: 0,
  })
  const queryClient = useQueryClient()

  const { mutate: createClientFn, isPending } = useMutation({
    mutationKey: ['createClient'],
    mutationFn: createClient,
    onSuccess: () => {
      setClient({
        name: '',
        email: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      }),
      queryClient.invalidateQueries({
        queryKey: ["get-clientes"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["route-map"],
      })
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setClient({
      ...client,
      [event.target.id]: event.target.value
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createClientFn(client)
  }
  return (
    <div className="z-[9999]">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 text-white hover:brightness-110 hover:bg-blue-500 hover:text-white" variant="outline">Cadastrar cliente</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] z-[9999]">
          <DialogHeader>
            <DialogTitle>Cadastrar cliente</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={client.name}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="col-span-3"
                  value={client.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  type="text"
                  required
                  className="col-span-3"
                  value={client.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="latitude" className="text-right">
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  type="text"
                  required
                  className="col-span-3"
                  value={client.latitude}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="longitude" className="text-right">
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  type="text"
                  required
                  className="col-span-3"
                  value={client.longitude}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                { isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
