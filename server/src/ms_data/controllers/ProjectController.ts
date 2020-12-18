import { Request, Response } from "express";
import ProjectSchema from "../schemas/ProjectSchema";
import Log from "../../common/classes/Log";

export const addNewProject = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    if (data) {
      if (data.userId && data.projectData) {
        if (data.projectData.config) {
          if (data.projectData.config.projectName) {
            if (data.projectData.config.projectName.length > 0) {
              const proj = new ProjectSchema({
                userId: data.userId,
                project: data.projectData,
                name: data.projectData.config.projectName
              });

              const newProject = await proj.save();
              return res.json({ error: false, projectId: newProject.id });
            }
          }
        }
      }
    }
  } catch (err) {
    Log.addError(err);
  }

  return res.json({ error: false, message: "server error" });
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    if (req.body.userId) {
      let projects: any = await ProjectSchema.find({ userId: req.body.userId });
      if (projects) {
        for (let i of projects) {
          i.project = JSON.stringify(i.project);
        }
        return res.json({ error: false, projects });
      }
    }
  } catch (err) {
    Log.addError(err);
  }

  return res.json({ error: true, message: "Server error" });
};

export const saveProjectData = (req: Request, res: Response) => {
  try {
    const projectData = JSON.parse(req.body.projectData);

    ProjectSchema.findByIdAndUpdate(projectData.id, {
      project: projectData
    })
      .then(result => {
        res.json({ error: false });
      })
      .catch(err => {
        Log.addError(err);
        res.json({ error: true });
      });
  } catch (err) {
    Log.addError(err);
    res.json({ error: true });
  }
};

export const searchProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectSchema.find({
      name: { $regex: req.body.searchTerm, $options: "i" }
    });

    res.json({ error: false, payload: projects || [] });
  } catch (err) {
    Log.addError(err);
    res.json({ error: false, payload: [] });
  }
};

export const getAllProjectsByUser = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectSchema.find({ userId: req.body.userId });
    res.json({ error: false, payload: projects || [] });
  } catch (err) {
    Log.addError(err);
    res.json({ error: false, payload: [] });
  }
};
