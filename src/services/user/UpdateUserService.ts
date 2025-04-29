import prismaClient from "../../prisma";

interface UserRequest{
    user_id: string;
    name: string;
    endereco: string;
}

class UpdateUserService{
    async execute({ user_id, name, endereco }){

        try {
            
            const userAlreadyExists = await prismaClient.user.findFirst({
                where:{
                    id: user_id,
                }
            })

            if(!userAlreadyExists){
                throw new Error("Usuário inválido");
            }

            const userUpdated = await prismaClient.user.update({
                where:{
                    id: user_id
                },
                data:{
                    name,
                    endereco,
                },
                select:{
                    name: true,
                    email: true,
                    endereco: true,
                }
            })

            return userUpdated;

        } catch (err) {
            console.log(err)
            throw new Error("Ops, algo deu errado ao tentar atualizar seu perfil, tente novamente mais tarde ou entre em contato com o Administrador. ")
        }
    }
}

export { UpdateUserService }