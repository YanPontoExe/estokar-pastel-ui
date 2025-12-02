export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      fornecedores: {
        Row: {
          cnpj: string
          contato: string | null
          created_at: string
          id: string
          nome_fornecedor: string
          updated_at: string
        }
        Insert: {
          cnpj: string
          contato?: string | null
          created_at?: string
          id?: string
          nome_fornecedor: string
          updated_at?: string
        }
        Update: {
          cnpj?: string
          contato?: string | null
          created_at?: string
          id?: string
          nome_fornecedor?: string
          updated_at?: string
        }
        Relationships: []
      }
      funcionarios: {
        Row: {
          cod_setor: string | null
          cpf: string
          created_at: string
          data_contratacao: string
          id: string
          nome: string
          status: boolean
          turno: Database["public"]["Enums"]["turno_type"]
          updated_at: string
        }
        Insert: {
          cod_setor?: string | null
          cpf: string
          created_at?: string
          data_contratacao?: string
          id?: string
          nome: string
          status?: boolean
          turno: Database["public"]["Enums"]["turno_type"]
          updated_at?: string
        }
        Update: {
          cod_setor?: string | null
          cpf?: string
          created_at?: string
          data_contratacao?: string
          id?: string
          nome?: string
          status?: boolean
          turno?: Database["public"]["Enums"]["turno_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "funcionarios_cod_setor_fkey"
            columns: ["cod_setor"]
            isOneToOne: false
            referencedRelation: "setores"
            referencedColumns: ["id"]
          },
        ]
      }
      marcas: {
        Row: {
          created_at: string
          descricao: string | null
          id: string
          nome_marca: string
          pais_origem: string | null
          status: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: string
          nome_marca: string
          pais_origem?: string | null
          status?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: string
          nome_marca?: string
          pais_origem?: string | null
          status?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      materiais: {
        Row: {
          cod_fornecedor: string | null
          cod_marca: string | null
          codigo: string
          created_at: string
          descricao: string
          estoque_minimo: number
          id: string
          localizacao: string | null
          quantidade_estoque: number
          status: boolean
          unidade: string
          updated_at: string
        }
        Insert: {
          cod_fornecedor?: string | null
          cod_marca?: string | null
          codigo: string
          created_at?: string
          descricao: string
          estoque_minimo?: number
          id?: string
          localizacao?: string | null
          quantidade_estoque?: number
          status?: boolean
          unidade: string
          updated_at?: string
        }
        Update: {
          cod_fornecedor?: string | null
          cod_marca?: string | null
          codigo?: string
          created_at?: string
          descricao?: string
          estoque_minimo?: number
          id?: string
          localizacao?: string | null
          quantidade_estoque?: number
          status?: boolean
          unidade?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "materiais_cod_fornecedor_fkey"
            columns: ["cod_fornecedor"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "materiais_cod_marca_fkey"
            columns: ["cod_marca"]
            isOneToOne: false
            referencedRelation: "marcas"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentacoes_entrada: {
        Row: {
          cod_fornecedor: string | null
          cod_material: string
          cod_usuario: string
          cod_usuario_temp: string | null
          created_at: string
          data_entrada: string
          id: string
          nota_fiscal: string | null
          observacoes: string | null
          quantidade: number
        }
        Insert: {
          cod_fornecedor?: string | null
          cod_material: string
          cod_usuario: string
          cod_usuario_temp?: string | null
          created_at?: string
          data_entrada?: string
          id?: string
          nota_fiscal?: string | null
          observacoes?: string | null
          quantidade: number
        }
        Update: {
          cod_fornecedor?: string | null
          cod_material?: string
          cod_usuario?: string
          cod_usuario_temp?: string | null
          created_at?: string
          data_entrada?: string
          id?: string
          nota_fiscal?: string | null
          observacoes?: string | null
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_entrada_cod_fornecedor_fkey"
            columns: ["cod_fornecedor"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_entrada_cod_material_fkey"
            columns: ["cod_material"]
            isOneToOne: false
            referencedRelation: "materiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_entrada_cod_usuario_fkey"
            columns: ["cod_usuario"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentacoes_saida: {
        Row: {
          cod_funcionario: string | null
          cod_material: string
          cod_usuario: string
          cod_usuario_temp: string | null
          created_at: string
          data_saida: string
          id: string
          motivo: Database["public"]["Enums"]["motivo_saida_type"]
          observacoes: string | null
          quantidade: number
        }
        Insert: {
          cod_funcionario?: string | null
          cod_material: string
          cod_usuario: string
          cod_usuario_temp?: string | null
          created_at?: string
          data_saida?: string
          id?: string
          motivo: Database["public"]["Enums"]["motivo_saida_type"]
          observacoes?: string | null
          quantidade: number
        }
        Update: {
          cod_funcionario?: string | null
          cod_material?: string
          cod_usuario?: string
          cod_usuario_temp?: string | null
          created_at?: string
          data_saida?: string
          id?: string
          motivo?: Database["public"]["Enums"]["motivo_saida_type"]
          observacoes?: string | null
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_saida_cod_funcionario_fkey"
            columns: ["cod_funcionario"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_saida_cod_material_fkey"
            columns: ["cod_material"]
            isOneToOne: false
            referencedRelation: "materiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_saida_cod_usuario_fkey"
            columns: ["cod_usuario"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      setores: {
        Row: {
          created_at: string
          descricao: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          descricao: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          descricao?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          id: string
          password_hash: string
          username: string
        }
        Insert: {
          id?: string
          password_hash: string
          username: string
        }
        Update: {
          id?: string
          password_hash?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "gerente" | "operador" | "consultor"
      motivo_saida_type:
        | "venda"
        | "transferência"
        | "devolução"
        | "uso interno"
        | "descarte"
      turno_type: "Manhã" | "Tarde" | "Noite"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "gerente", "operador", "consultor"],
      motivo_saida_type: [
        "venda",
        "transferência",
        "devolução",
        "uso interno",
        "descarte",
      ],
      turno_type: ["Manhã", "Tarde", "Noite"],
    },
  },
} as const
