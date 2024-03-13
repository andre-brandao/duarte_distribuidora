import { z } from 'zod';

export const formSchema = z.object({
	id: z.number().optional(),
	nome: z.string().min(2).max(50),
	descricao: z.string(),
	preco_atacado: z.number(),
	preco_varejo: z.number()
});

export type FormSchema = typeof formSchema;
