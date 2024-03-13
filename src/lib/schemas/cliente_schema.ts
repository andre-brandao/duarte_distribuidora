import { z } from 'zod';

export const formSchema = z.object({
	id: z.number().optional(),
	nome: z.string().min(2).max(50),
	email: z.string().email().optional(),
	data_nascimento: z.string().optional(),
	celular: z.string().min(11).max(11),
	telefone_fixo: z.string().min(10).max(10).optional(),
    cpf_cnpj: z.string().min(11).max(14).optional(),
    rg_ie: z.string().min(5).max(20).optional(),
});

export type FormSchema = typeof formSchema;
