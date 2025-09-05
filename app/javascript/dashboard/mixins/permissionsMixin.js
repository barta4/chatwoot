import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['getCurrentUser', 'isAdmin']),
    
    // Verificaciones principales
    canManageLabels() {
      return this.isAdmin || this.hasPermission('manage_labels');
    },
    
    canManageContacts() {
      return this.isAdmin || this.hasPermission('contact_manage');
    },
    
    canManageReports() {
      return this.isAdmin || this.hasPermission('report_manage');
    },
    
    canManageKnowledgeBase() {
      return this.isAdmin || this.hasPermission('knowledge_base_manage');
    },
    
    canManageConversations() {
      return this.isAdmin || this.hasPermission('conversation_manage');
    },
    
    canManageUnassignedConversations() {
      return this.isAdmin || this.hasPermission('conversation_unassigned_manage');
    },
    
    canManageParticipatingConversations() {
      return this.isAdmin || this.hasPermission('conversation_participating_manage');
    },
    
    // Información del usuario actual
    currentUserRole() {
      return this.getCurrentUser?.custom_role;
    },
    
    currentUserPermissions() {
      return this.currentUserRole?.permissions || [];
    },
    
    userRoleName() {
      if (this.isAdmin) return 'Administrator';
      return this.currentUserRole?.name || 'Agent';
    }
  },
  
  methods: {
    // Método principal para verificar permisos
    hasPermission(permission) {
      const customRole = this.getCurrentUser?.custom_role;
      return customRole && customRole.permissions.includes(permission);
    },
    
    // Verificar múltiples permisos (OR)
    hasAnyPermission(permissions) {
      if (this.isAdmin) return true;
      return permissions.some(permission => this.hasPermission(permission));
    },
    
    // Verificar todos los permisos (AND)
    hasAllPermissions(permissions) {
      if (this.isAdmin) return true;
      return permissions.every(permission => this.hasPermission(permission));
    },
    
    // Mostrar error de permisos
    showPermissionError(action = 'perform this action') {
      this.$toast.error(`You don't have permission to ${action}`);
    },
    
    // Verificar si puede realizar acción específica
    canPerformAction(action) {
      const actionPermissions = {
        'create_label': 'manage_labels',
        'edit_label': 'manage_labels',
        'delete_label': 'manage_labels',
        'create_contact': 'contact_manage',
        'edit_contact': 'contact_manage',
        'view_reports': 'report_manage',
        'manage_knowledge_base': 'knowledge_base_manage'
      };
      
      const requiredPermission = actionPermissions[action];
      return this.isAdmin || (requiredPermission && this.hasPermission(requiredPermission));
    }
  }
};
