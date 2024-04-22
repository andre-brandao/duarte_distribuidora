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
      categoria: {
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
          quantidade: number
        }
        Insert: {
          created_at?: string
          id?: number
          quantidade: number
        }
        Update: {
          created_at?: string
          id?: number
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_estoque_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "var_produto"
            referencedColumns: ["id"]
          },
        ]
      }
      pedido: {
        Row: {
          cliente_id: number
          created_at: string
          id: number
          meta_data: Json | null
          tipo: string
          total_in_cents: number
        }
        Insert: {
          cliente_id: number
          created_at?: string
          id?: number
          meta_data?: Json | null
          tipo: string
          total_in_cents: number
        }
        Update: {
          cliente_id?: number
          created_at?: string
          id?: number
          meta_data?: Json | null
          tipo?: string
          total_in_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_pedido_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "cliente"
            referencedColumns: ["id"]
          },
        ]
      }
      preco: {
        Row: {
          created_at: string
          id: number
          preco_in_cents: number
          tipo: string
          var_produto_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          preco_in_cents: number
          tipo: string
          var_produto_id: number
        }
        Update: {
          created_at?: string
          id?: number
          preco_in_cents?: number
          tipo?: string
          var_produto_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_preco_var_produto_id_fkey"
            columns: ["var_produto_id"]
            isOneToOne: false
            referencedRelation: "var_produto"
            referencedColumns: ["id"]
          },
        ]
      }
      produto: {
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
      produto_pedido: {
        Row: {
          created_at: string
          pedido_id: number
          quantidade: number
          total_in_cents: number
          unidade_in_cents: number
          var_produto_id: number
        }
        Insert: {
          created_at?: string
          pedido_id: number
          quantidade?: number
          total_in_cents: number
          unidade_in_cents: number
          var_produto_id: number
        }
        Update: {
          created_at?: string
          pedido_id?: number
          quantidade?: number
          total_in_cents?: number
          unidade_in_cents?: number
          var_produto_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_produto_pedido_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedido"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_produto_pedido_var_produto_id_fkey"
            columns: ["var_produto_id"]
            isOneToOne: false
            referencedRelation: "var_produto"
            referencedColumns: ["id"]
          },
        ]
      }
      transacao_estoque: {
        Row: {
          created_at: string
          estoque_id: number
          id: number
          meta_data: Json | null
          quantidade: number
        }
        Insert: {
          created_at?: string
          estoque_id: number
          id?: number
          meta_data?: Json | null
          quantidade: number
        }
        Update: {
          created_at?: string
          estoque_id?: number
          id?: number
          meta_data?: Json | null
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_transacao_estoque_estoque_id_fkey"
            columns: ["estoque_id"]
            isOneToOne: false
            referencedRelation: "estoque"
            referencedColumns: ["id"]
          },
        ]
      }
      var_produto: {
        Row: {
          categoria_id: number | null
          created_at: string
          id: number
          preco_custo_in_cents: number
          produto_id: number
        }
        Insert: {
          categoria_id?: number | null
          created_at?: string
          id?: number
          preco_custo_in_cents?: number
          produto_id: number
        }
        Update: {
          categoria_id?: number | null
          created_at?: string
          id?: number
          preco_custo_in_cents?: number
          produto_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_var_produto_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categoria"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_var_produto_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produto"
            referencedColumns: ["id"]
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
