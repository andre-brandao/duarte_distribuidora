export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categoria_produto: {
        Row: {
          created_at: string
          id: number
          nome: string
        }
        Insert: {
          created_at?: string
          id?: number
          nome: string
        }
        Update: {
          created_at?: string
          id?: number
          nome?: string
        }
        Relationships: []
      }
      cliente: {
        Row: {
          celular: string
          cpf_cnpj: string | null
          created_at: string
          data_nascimento: string | null
          email: string | null
          id: number
          nome: string
          rg_ie: string | null
          telefone_fixo: string | null
        }
        Insert: {
          celular: string
          cpf_cnpj?: string | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          id?: number
          nome?: string
          rg_ie?: string | null
          telefone_fixo?: string | null
        }
        Update: {
          celular?: string
          cpf_cnpj?: string | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          id?: number
          nome?: string
          rg_ie?: string | null
          telefone_fixo?: string | null
        }
        Relationships: []
      }
      estoque: {
        Row: {
          created_at: string
          id: number
          nome: string
          quantidade: number
          tipo: string
        }
        Insert: {
          created_at?: string
          id?: number
          nome: string
          quantidade?: number
          tipo?: string
        }
        Update: {
          created_at?: string
          id?: number
          nome?: string
          quantidade?: number
          tipo?: string
        }
        Relationships: []
      }
      produto_ingrediente: {
        Row: {
          created_at: string
          ingrediente_id: number
          produto_id: number
          quantidade: number
        }
        Insert: {
          created_at?: string
          ingrediente_id: number
          produto_id: number
          quantidade?: number
        }
        Update: {
          created_at?: string
          ingrediente_id?: number
          produto_id?: number
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_produto_ingrediente_ingrediente_id_fkey"
            columns: ["ingrediente_id"]
            isOneToOne: false
            referencedRelation: "estoque"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_produto_ingrediente_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          }
        ]
      }
      produtos: {
        Row: {
          cateogira_id: number | null
          created_at: string
          descricao: string
          id: number
          nome: string
          preco_atacado: number
          preco_varejo: number
        }
        Insert: {
          cateogira_id?: number | null
          created_at?: string
          descricao?: string
          id?: number
          nome?: string
          preco_atacado?: number
          preco_varejo?: number
        }
        Update: {
          cateogira_id?: number | null
          created_at?: string
          descricao?: string
          id?: number
          nome?: string
          preco_atacado?: number
          preco_varejo?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_produtos_cateogira_id_fkey"
            columns: ["cateogira_id"]
            isOneToOne: false
            referencedRelation: "categoria_produto"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
