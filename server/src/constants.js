export const DB_NAME = "db_v0"

export const ROLE_POLICIES = {
  administrator: {
    workspace: {
      view: true,
      edit: true,
      delete: (user, workspace) => workspace.owner.equals(user._id),
      manageMembers: true,
      transferOwnership: true,
    },
    project: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      manageMembers: true,
      changeStatus: true,
    },
    task: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      changeStatus: true,
    }
  },  

  project_manager: {
    workspace: {
      view: true,
      edit: true,
      delete: false,
      manageMembers: false,
      transferOwnership: false,
    },
    project: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      manageMembers: true,
      changeStatus: true,
    },
    task: {
      view: true,
      create: true,
      edit: true,
      delete:true,
      changeStatus: true,
    }
  },

  team_lead: {
    workspace: {
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      transferOwnership: false,
    },
    project: {
      create: false,
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      changeStatus: false,
    },
    task: {
      create: true,
      view: true,
      edit: true,
      delete: true,
      assign: true,
      changeStatus: true,
    }
  },

  qa_specialist: {
    workspace: {
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      transferOwnership: false,
    },
    project: {
      create: false,
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      changeStatus: false,
    },
    task: {
      create: false,
      view: true,
      edit: true,
      delete: false,
      assign: false,
      changeStatus: true,
    }
  },

  developer: {
    workspace: {
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      transferOwnership: false,
    },
    project: {
      create: false,
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      changeStatus: false,
    },
    task: {
      create: true,
      view: true,
      edit: true,
      delete: false,
      assign: false,
      changeStatus: true,
    }
  },

  vendor: {
    workspace: {
      view: false,
      edit: false,
      delete: false,
      manageMembers: false,
      transferOwnership: false,
    },
    project: {
      create: false,
      view: false,
      edit: false,
      delete: false,
      manageMembers: false,
      changeStatus: false,
    },
    task: {
      create: false,
      view: true,
      edit: false,
      delete: false,
      assign: false,
      changeStatus: false,
    }
  },

  intern: {
    workspace: {
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      transferOwnership: false,
    },
    project: {
      create: false,
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      changeStatus: false,
    },
    task: {
      create: true,
      view: true,
      edit: true,
      delete: false,
      assign: false,
      changeStatus: true,
    }
  },

  client: {
    workspace: {
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      transferOwnership: false,
    },
    project: {
      create: false,
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      changeStatus: false,
    },
    task: {
      create: false,
      view: true,
      edit: false,
      delete: false,
      assign: false,
      changeStatus: false,
    }
  },

  stakeholder: {
    workspace: {
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      transferOwnership: false,
    },
    project: {
      create: false,
      view: true,
      edit: false,
      delete: false,
      manageMembers: false,
      changeStatus: false,
    },
    task: {
      create: false,
      view: true,
      edit: false,
      delete: false,
      assign: false,
      changeStatus: false,
    }
  },

  guest: {
    workspace: {
      view: false,
      edit: false,
      delete: false,
      manageMembers: false,
      transferOwnership: false,
    },
    project: {
      create: false,
      view: false,
      edit: false,
      delete: false,
      manageMembers: false,
      changeStatus: false,
    },
    task: {
      create: false,
      view: false,
      edit: false,
      delete: false,
      assign: false,
      changeStatus: false,
    }
  }
};
