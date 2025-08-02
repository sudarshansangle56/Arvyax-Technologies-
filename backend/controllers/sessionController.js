const Session = require('../models/Session');
exports.getPublicSessions = async (req, res) => {
  const sessions = await Session.find({ status: 'published' });
  res.json(sessions);
};
exports.getUserSessions = async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id });
  res.json(sessions);
};
exports.getSessionById = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
  res.json(session);
};
exports.saveDraft = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;
  const data = { title, tags, json_file_url, status: 'draft', updated_at: Date.now() };
  const session = id
    ? await Session.findByIdAndUpdate(id, data, { new: true })
    : await Session.create({ ...data, user_id: req.user.id });
  res.json(session);
};
exports.publishSession = async (req, res) => {
  const { id } = req.body;
  const session = await Session.findByIdAndUpdate(id, { status: 'published', updated_at: Date.now() }, { new: true });
  res.json(session);
};
